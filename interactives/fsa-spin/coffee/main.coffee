{FSARunner} = window.FSA

spinnerFSA = new FSARunner
    Start: 'slow'
    Alphabet: ['reset', 'next']
    States:
        slow:
            transitions:
                next: 'medium'
                reset: 'slow'
        medium:
            transitions:
                next: 'fast'
                reset: 'slow'
        fast:
            transitions:
                next: 'slow'
                reset: 'slow'


$inputs = $("#interactive-fsa-spin [fsa-spin-input]")
$spinner = $("#interactive-fsa-spin .rotating")

$inputs.click ->
    # When an input is clicked tell the FSA to use the transition
    # defined by that input e.g.
    #           slow --next--> medium
    # or      medium --reset--> slow
    spinnerFSA.next($(this).attr('fsa-spin-input'))

spinnerFSA.onChange ({currentState}) ->
    # When the FSA changes to a new state change the speed of the fan blades
    # animation and effects are done via CSS
    $spinner.attr('speed', currentState)
