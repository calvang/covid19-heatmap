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
            # print(row[0])
            first = row[0]
            last = row[len(row)-2]
            county_dict = {
                'County': row[1],
                'FIPS': first,
                'CurrentCases': last
            }
            if not int(first) == 0: 
                abridged_data.append(county_dict)
            print(county_dict['CurrentCases'])
        line += 1

for county in abridged_data:
    for i in county_data:
        if int(county['FIPS']) == int(i['FIPS']):
            county['Lat'] = i['Latitude']
            county['Lon'] = i['Longitude']
            county['Population'] = i['Population']
            county['State'] = i['State']

# check over data for inconsistencies
index = 0
for county in abridged_data:
    if not 'Lat' in county:
        del abridged_data[index]
    index += 1

with open('fullCountyData.json', 'w') as outfile:
    outfile.write(json.dumps(abridged_data, indent=4, sort_keys=True))
