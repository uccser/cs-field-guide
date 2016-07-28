"use strict"
Rx = require('rxjs')
Observable = Rx.Observable

relativeTo = (element, event) ->
    ### This returns the [x, y] coordinates of an event relative to
        the given element
    ###
    x = event.pageX - element.getBoundingClientRect().left
    y = event.pageY - element.getBoundingClientRect().top
    return [x, y]

selectWithin = (element) ->
    ### This is an observable of selectWithin observables, each selectWithin
        observable gives a set of coordinates of the start and endpoints
    ###
    mouseDowns = Observable.fromEvent(element, "mousedown")
    mouseMoves = Observable.fromEvent(document.body, "mousemove")
    mouseUps   = Observable.fromEvent(document.body, "mouseup")

    return mouseDowns.map (mouseDown) ->
        ### When the mouse is clicked begin a selectWithin observable ###
        return new Observable (moveObserver) ->
            movesSubscription = mouseMoves.subscribe next: (mouseMove) ->
                moveObserver.next [
                    relativeTo(element, mouseDown),
                    relativeTo(element, mouseMove)
                ]
            upSubscription = mouseUps.subscribe next: (mouseUp) ->
                moveObserver.complete [
                    relativeTo(element, mouseDown),
                    relativeTo(element, mouseUp)
                ]
                movesSubscription.unsubscribe()
                upSubscription.unsubscribe()

module.exports = selectWithin
