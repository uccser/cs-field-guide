# Pixel Grid Interactive

**Author:** Alasdair Smith

This interactive creates a grid of squares with x and y axis labels.
Users can click on any square on the grid to flip its colour between black and white.
Optional URL parameters can be used to: specify the grid size, disallow flipping,
and either; display one of 3 preset examples or set up to 5 coordinates in advance.

## URL Parameters

- `Xx=N&Xy=M`: Set the coordinate `(N, M)` as flipped by default, and to display the given character. `X` can be any one of `[A, B, C, D, R]`. If two characters share coordinates, the leftmost character from the list will be displayed. This is overwritten if `eg` is set.
- `eg=[basic|s3l|sod]`: Set to display one of three example grids. Overwrites any `Xx&Xy` parameters.
- `h=N`: Set the height of the grid, where `N` is the number of rows. By default `N=20`.
- `w=N`: Set the width of the grid, where `N` is the number of columns. By default `N=20`.
- `noedit`: Set the grid to be uneditable: i.e. No squares can be flipped from their original orientation.

## Example Grids

- `basic`: Creates 5 distinct straight lines: Vertical, at three different angles, and horizontal.
- `s3l` ('Solution 3 Lines'): Creates a vertical line, one at 45 degrees and one horizontal.
- `sod` ('Solution Off Diagonal'): Creates a single straight line between (3, 4) and (16, 9).
