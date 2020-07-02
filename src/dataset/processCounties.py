import csv, json

abridged_data = []

with open('counties.json','r') as file1:
    data = file1.read()
    county_data = json.loads(data)

with open('currentCountyCases.csv') as file2:
    reader = csv.reader(file2, delimiter=',')
    
    line = 0
    for row in reader:
        if line > 0:
            print(row[0])
            first = row[0]
            last = row[len(row)-1]
            county_dict = {
                'FIPS': first,
                'LatestCases': last
            }
            if not int(first) == 0: 
                abridged_data.append(county_dict)
            # print(county_dict['FIPS'])
        line += 1

for county in abridged_data:
    for i in county_data:
        if int(county['FIPS']) == int(i['FIPS']):
            county['Lat'] = i['Latitude']
            county['Lon'] = i['Longitude']
            county['Population'] = i['Population']
            county['State'] = i['State']

with open('fullCountyData.json', 'w') as outfile:
    outfile.write(json.dumps(abridged_data, indent=4, sort_keys=True))
