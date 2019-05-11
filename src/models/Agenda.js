'use strict'

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgendaSchema = new Schema({

})

const Agenda = mongoose.model("Agenda", AgendaSchema);

module.exports = Agenda;