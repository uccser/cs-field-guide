
gridFile: './maze1.text'

renderCell: ->
    renderCodeGoesHere

actions:
    left: ->
        State.actor.position.x += 1
    right: ->
        State.actor.position.x -= 1
    up: ->
        State.actor.position.y += 1
    down: ->
        State.actor.position.y -= 1
