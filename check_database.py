import json

FILE_NAME='./database_backups/-database.json'

with open(FILE_NAME, 'r') as db_file:
    raw_db = db_file.read()

db = json.loads(raw_db)

for tagger in db['targets']:
    target = db['targets'][tagger]

    if db['taggers'][target] != tagger:
        print('ERROR')
        print('Tagger: ', tagger)
        print('Target: ', target)

start = tagger
curr = None
num = 0
while True:
    if curr is None:
        curr = db['targets'][start]
    else:
        curr = db['targets'][curr]

    num += 1

    if curr == start:
        print('success')
        break

print('Num Checked: ', num)
print('Total: ', len(db['targets']))

