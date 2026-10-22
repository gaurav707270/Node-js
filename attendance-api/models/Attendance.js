import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
    {
        facultyId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Faculty",
            required: true
        },
        date: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Present", "Absent"],
            required: true
        }
    },
    {
        timestamps: true
    }
);

attendanceSchema.index(
    { facultyId: 1, date: 1 },
    { unique: true }
);

const Attendance = mongoose.model("Attendance", attendanceSchema);

export default Attendance;
