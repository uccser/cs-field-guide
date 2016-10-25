"use strict"
Rx = require('rxjs')
Observable = Rx.Observable
relativeTo = require('./relativeTo.coffee')

selectWithin = (element, relativeElement=null) ->
    ### This is an observable of selectWithin observables, each selectWithin
        observable gives a set of coordinates of the start and endpoints
    ###
    relativeElement ?= element
    mouseDowns = Observable.fromEvent(element, "mousedown")
        .filter((event) -> event.button is 0)
    mouseMoves = Observable.fromEvent(document.body, "mousemove")
    mouseUps   = Observable.fromEvent(document.body, "mouseup")

    return mouseDowns.map (mouseDown) ->
        ### When the mouse is clicked begin a selectWithin observable ###
        return new Observable (moveObserver) ->
            movesSubscription = mouseMoves.subscribe next: (mouseMove) ->
                moveObserver.next [
                    relativeTo(relativeElement, mouseDown),
                    relativeTo(relativeElement, mouseMove)
                ]
            upSubscription = mouseUps.subscribe next: (mouseUp) ->
                moveObserver.complete [
                    relativeTo(relativeElement, mouseDown),
                    relativeTo(relativeElement, mouseUp)
                ]
                movesSubscription.unsubscribe()
                upSubscription.unsubscribe()

module.exports = selectWithin
