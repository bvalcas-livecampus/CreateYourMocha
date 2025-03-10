const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('./server');

chai.use(chaiHttp);

describe('Notes API Functional Tests', () => {
    let testNoteId;

    describe('POST /notes', () => {
        it('should create a new note', (done) => {
            const note = {
                title: 'Test Note',
                content: 'Test Content'
            };

            chai.request(app)
                .post('/notes')
                .send(note)
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('id');
                    expect(res.body.title).to.equal(note.title);
                    expect(res.body.content).to.equal(note.content);
                    testNoteId = res.body.id;
                    done();
                });
        });

        it('should return 400 when title or content is missing', (done) => {
            const invalidNote = {
                title: 'Test Note'
            };

            chai.request(app)
                .post('/notes')
                .send(invalidNote)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    describe('GET /notes', () => {
        it('should get all notes', (done) => {
            chai.request(app)
                .get('/notes')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });

    describe('GET /notes/:id', () => {
        it('should get a specific note by id', (done) => {
            chai.request(app)
                .get(`/notes/${testNoteId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('id', testNoteId);
                    done();
                });
        });

        it('should return 404 for non-existent note', (done) => {
            chai.request(app)
                .get('/notes/999')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    describe('PUT /notes/:id', () => {
        it('should update an existing note', (done) => {
            const updatedNote = {
                title: 'Updated Note',
                content: 'Updated Content'
            };

            chai.request(app)
                .put(`/notes/${testNoteId}`)
                .send(updatedNote)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.title).to.equal(updatedNote.title);
                    expect(res.body.content).to.equal(updatedNote.content);
                    done();
                });
        });

        it('should return 404 when updating non-existent note', (done) => {
            const updatedNote = {
                title: 'Updated Note',
                content: 'Updated Content'
            };

            chai.request(app)
                .put('/notes/999')
                .send(updatedNote)
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });

    describe('DELETE /notes/:id', () => {
        it('should delete an existing note', (done) => {
            chai.request(app)
                .delete(`/notes/${testNoteId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message');
                    expect(res.body).to.have.property('deletedNote');
                    done();
                });
        });

        it('should return 404 when deleting non-existent note', (done) => {
            chai.request(app)
                .delete('/notes/999')
                .end((err, res) => {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('error');
                    done();
                });
        });
    });
});
