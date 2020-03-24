// const {DataStore} = require('notarealdb')

// const store = new DataStore('./data')

module.exports = {
    students: [
        {
            id: 'S1001',
            firstName: 'Mohtashim',
            lastName: 'Mohammad',
            email: 'mohtashim.mohammad@tutorialpoint.org',
            password: 'pass123',
            collegeId: 'col-102'
        },

        {
            id: 'S1002',
            email: 'kannan.sudhakaran@tutorialpoint.org',
            firstName: 'Kannan',
            lastName: 'Sudhakaran',
            password: 'pass123',
            collegeId: 'col-101'
        },

        {
            id: 'S1003',
            email: 'kiran.panigrahi@tutorialpoint.org',
            firstName: 'Kiran',
            lastName: 'Panigrahi',
            password: 'pass123',
            collegeId: 'col-101'
        }
    ],
    colleges: [
        {
            id: 'col-101',
            name: 'AMU',
            location: 'Uttar Pradesh',
            rating: 5.0
        },
        {
            id: 'col-102',
            name: 'CUSAT',
            location: 'Kerala',
            rating: 4.5
        }
    ]
    //  students: store.collection('students'),
    //  colleges: store.collection('colleges')
}
