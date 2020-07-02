#!/bin/bash
# Script to get updated Covid-19 data on counties and process it to be readable by the map
# Schedule a cron job to automate these updates

echo "Retrieving updated county data..."
curl https://usafactsstatic.blob.core.windows.net/public/data/covid-19/covid_confirmed_usafacts.csv > currentCountyCases.csv

echo "Processing data..."
python3 processCounties.py

echo "Done."