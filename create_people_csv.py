import pandas as pd

# Class,Last,First,Nickname,Email
people = pd.read_csv('gotcha.csv', header=0)

print(people.columns.values)

people_csv_file = open('people.csv', 'w+')

out = ''

for person in people.values:
    # Email, Name, Class, Graduation Year
    line = ''

    line += person[4] + ','
    line += '%s %s' % (person[2], person[1]) + ','
    line += {2018: '1', 2019: '2', 2020: '3', 2021: '4'}[person[0]] + ','
    line += str(person[0])
    line += '\n'

    out += line

out = out[:-1]

people_csv_file.write(out)
people_csv_file.close()
