# Reads people.csv - Header : Email, Name, Class, Graduation Year

from pprint import pprint
import random
import copy
import json
import sys

TEST = '--test' in sys.argv

with open('people.csv' if not TEST else 'people-test.csv', 'r') as people_file:
    raw_people = people_file.read()

people = []
for person in raw_people.split('\n'):
    email, name, class_number, year = person.split(',')
    email = email.replace('.', '')
    person = {
        'email': email,
        'name': name,
        'class': class_number,
        'year': year
    }
    people.append(person)

shuffled_people = copy.copy(people)
random.shuffle(shuffled_people)

targets = {}
taggers = {}
out = {}
names = {}
numTags = {}
classes = {}
for i, person in enumerate(shuffled_people):
    if i == len(shuffled_people) - 1:
        target_email = shuffled_people[0]['email']
        targets[person['email']] = target_email
        taggers[target_email] = person['email']
    else:
        target_email = shuffled_people[i+1]['email']
        targets[person['email']] = target_email
        taggers[target_email] = person['email']

    out[person['email']] = False
    names[person['email']] = person['name']
    numTags[person['email']] = 0
    classes[person['email']] = person['class']

database = {
    'targets': targets,
    'taggers': taggers,
    'out': out,
    'names': names,
    'numTags': numTags,
    'classes': classes
}

with open('database.json', 'w') as database_file:
    database_file.write(json.dumps(database, indent=4))
