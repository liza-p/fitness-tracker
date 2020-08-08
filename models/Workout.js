const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const WorkoutSchema = new Schema(
    {
        day: {
            type: Date,
            default: Date.now()
        },
        exercises: [
            {
                type: {
                    type: String,
                    required: "Type is required"
                },
                name: {
                    type: String,
                    required: "Name is required"
                },
                duration: {
                    type: Number,
                    required: "Duration is required"
                },
                weight: {
                    type: Number
                },
                reps: {
                    type: Number
                },
                sets: {
                    type: Number
                },
                distance: {
                    type: Number
                }
            }
        ],
    },
    {
        toJSON: {
            virtuals: true
        }
    }
);

WorkoutSchema.virtual('totalDuration').get(function () {
    let totalDuration = 0;
    for (let i = 0; i < this.exercises.length; i++) {
        totalDuration += this.exercises[i].duration;
    }
    return totalDuration;
});



const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;