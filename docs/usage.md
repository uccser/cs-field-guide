# Usage Documentation

This documentation page provides information about running and configuring the Computer Science Field Guide.

## Main Usage

Run `generateguide.py` with Python 3.
This will produce an student version of the CSFG in English.

### Optional Parameters

The following parameters may be used to alter the generation process:
- `--language` or `-l` followed by language codes: Outputs in the given languages
- `--teacher` or `-t`: Outputs both student and teacher versions of the CSFG

For example: Running `python generateguide.py --language en de fr -t` will produce the CSFG in English, German, and French with teacher versions included.
