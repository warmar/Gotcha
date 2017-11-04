# Reads people.csv - Header : Email, Name

from pprint import pprint
import random
import copy

with open('people.csv', 'r') as people_file:
    raw_people = people_file.read()

people = []
for person in raw_people.split('\n')[1:]:
    email, name = person.split(',')
    email = email.replace('.', '')
    person = {
        'email': email,
        'name': name
    }
    people.append(person)

shuffled_people = copy.copy(people)
random.shuffle(shuffled_people)

targets = {}
taggers = {}
for i, person in enumerate(shuffled_people):
    if i == len(shuffled_people) - 1:
        target_email = shuffled_people[0]['email']
        targets[person['email']] = target_email
        taggers[target_email] = person['email']
    else:
        target_email = shuffled_people[i+1]['email']
        targets[person['email']] = target_email
        taggers[target_email] = person['email']

pprint(targets)
pprint(taggers)