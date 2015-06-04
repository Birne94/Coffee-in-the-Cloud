import random, time

random.seed(1337)


class Account:
    assignment_base = 5
    assignment_value = 5
    first_name = ""
    coffees = 0

    def __init__(self, name, b=5, v=5):
        self.first_name = name
        self.assignment_base = b
        self.assignment_value = v

    def add_coffees(self):
        self.coffees = random.randint(0, 30)

    def get_coffee_count(self):
        return self.coffees

    def __repr__(self):
        return "%s (%f/%f/%d)"%(self.first_name, self.assignment_base, self.assignment_value, self.coffees)


accounts = [
    Account("Daniel"),
    Account("Theresa"),
    Account("Corny")
]

while True:
    for acc in accounts:
        acc.add_coffees()
        acc.assignment_value += acc.get_coffee_count() / 30. # TODO Tage im Monat

    assigned = None
    for acc in accounts:
        acc.assignment_value + 1
        if not assigned or assigned.assignment_value < acc.assignment_value:
            assigned = acc

    if assigned:
        print "Assigned", assigned
        assigned.assignment_value = assigned.assignment_base

    time.sleep(0.51)