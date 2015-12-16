"use strict"
require('es5-shim')
require('es6-shim')
Chart = require('chart.js')

TextID = "#interactive-frequency-analysis-input"
ChartID = "#interactive-frequency-analysis-chart-display"

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

characterFrequencies = (string) ->
    ### Given a string this gives a map of frequencies ###
    freqs = new Map()
    for char in string
        newCount = (freqs.get(char) ? 0) + 1
        freqs.set(char, newCount)
    return freqs

# Keep reference to a chart so we can destroy it when we replace it
chart = null

$("#interactive-frequency-analysis-button").click ->
    # Render the chart when clicked, destroy old chart if it exists
    ctx = $(ChartID)[0].getContext('2d')
    if chart?
        chart.destroy()

    text = $(TextID).val().toUpperCase()

    allCharFrequencies = characterFrequencies(text)

    alphabeticFrequencies = for char in ALPHABET
        freq = allCharFrequencies.get(char) ? 0
        [char, freq]

    alphabeticFrequencies.sort (element1, element2) ->
        # Sort according to the max values
        if element1[1] > element2[1]
            return -1
        else if element1[1] is element2[1]
            # If equal then sort alphabetically
            if element1[0] > element2[0]
                return 1
            else
                return -1
        else
            return 1


    labels = alphabeticFrequencies.map (pair) -> pair[0] # Keys
    freqData = alphabeticFrequencies.map (pair) -> pair[1] # Values
    data =
        labels: labels
        datasets: [
            {
                label: "Character Frequency"
                data: freqData
                barWidth: 20
            }
        ]

    chart = new Chart(ctx).Bar data,
        scaleFontSize: 16
