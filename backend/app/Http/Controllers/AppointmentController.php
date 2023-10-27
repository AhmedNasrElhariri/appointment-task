<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function createAppointment(Request $request)
    {
        $appointment = Appointment::create(['user_id' => $request->user_id, 'patient_id' => $request->patient_id, 'doctor_id' => $request->doctor_id, 'date' => date('Y-m-d H:i:s', strtotime($request->date))]);
        return response()->json($appointment);
    }
    public function getAppoitments($user_id, $user_type)
    {
        if ($user_type == 'Patient') {
            $appointments = Appointment::with('patient', 'doctor')->where('patient_id', '=', $user_id)->get();
        } else if ($user_type == 'Doctor') {
            $appointments = Appointment::with('patient', 'doctor')->where('doctor_id', '=', $user_id)->get();
        } else { //admin condition
            $appointments = Appointment::with('patient', 'doctor')->get();
        }
        return $appointments;
    }
    public function appointments(Request $request)
    {
        $user_id = $request->user_id;
        $user_type = $request->type;
        $appointments = $this->getAppoitments($user_id, $user_type);
        return response()->json($appointments);
    }
    public function updateAppointmentStstus(Request $request)
    {
        $user_id = $request->user_id;
        $status = $request->status;
        $user_type = $request->type;
        $appointmentId = $request->appointmentId;
        Appointment::where('id', $appointmentId)->update(array('status' => $status));
        $appointments = $this->getAppoitments($user_id, $user_type);
        return response()->json($appointments);

    }
}
