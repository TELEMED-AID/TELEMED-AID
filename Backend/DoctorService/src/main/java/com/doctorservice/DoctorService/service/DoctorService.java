package com.doctorservice.DoctorService.service;

import com.doctorservice.DoctorService.dto.CreateDoctorRequest;
import com.doctorservice.DoctorService.dto.DoctorResponse;
import com.doctorservice.DoctorService.dto.DoctorUpdateRequest;
import com.doctorservice.DoctorService.entity.CareerLevel;
import com.doctorservice.DoctorService.entity.Doctor;
import com.doctorservice.DoctorService.entity.Specialization;
import com.doctorservice.DoctorService.exception.EntityNotFoundException;
import com.doctorservice.DoctorService.repository.CareerLevelRepository;
import com.doctorservice.DoctorService.repository.DoctorRepository;
import com.doctorservice.DoctorService.repository.SpecializationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;

@Service
@RequiredArgsConstructor
public class DoctorService {
    private final DoctorRepository doctorRepository;
    private final CareerLevelRepository careerLevelRepository;
    private final SpecializationRepository specializationRepository;

    @Transactional
    public DoctorResponse addDoctor(CreateDoctorRequest request) {
        if (doctorRepository.existsById(request.getNationalId())) {
            throw new IllegalArgumentException("Doctor with this ID already exists");
        }

        CareerLevel careerLevel = careerLevelRepository.findByCareerLevelName(request.getCareerLevelName())
                .orElseThrow(() -> new EntityNotFoundException("Career level not found with name: " + request.getCareerLevelName()));

        Specialization specialization = specializationRepository.findBySpecializationName(request.getSpecializationName())
                .orElseThrow(() -> new EntityNotFoundException("Specialization not found with name: " + request.getSpecializationName()));

        Doctor doctor = new Doctor();
        doctor.setNationalId(request.getNationalId());
        doctor.setName(request.getName());
        doctor.setPhone(request.getPhone());
        doctor.setBirthDate(request.getBirthDate());
        doctor.setGender(request.getGender());
        doctor.setCountryName(request.getCountryName());
        doctor.setCountryId(request.getCountryId());
        doctor.setCareerLevel(careerLevel);
        doctor.setSpecialization(specialization);

        Doctor savedDoctor = doctorRepository.save(doctor);
        return mapToDoctorResponse(savedDoctor);
    }

    @Transactional
    public DoctorResponse updateDoctorProfile(String nationalId, DoctorUpdateRequest request) {
        Doctor doctor = doctorRepository.findById(nationalId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found with ID: " + nationalId));

        // Only update name and phone as per the simplified request
        doctor.setName(request.getName());
        doctor.setPhone(request.getPhone());

        Doctor updatedDoctor = doctorRepository.save(doctor);
        return mapToDoctorResponse(updatedDoctor);
    }

    @Transactional(readOnly = true)
    public DoctorResponse getDoctorById(String nationalId) {
        Doctor doctor = doctorRepository.findById(nationalId)
                .orElseThrow(() -> new EntityNotFoundException("Doctor not found with ID: " + nationalId));
        return mapToDoctorResponse(doctor);
    }

    private DoctorResponse mapToDoctorResponse(Doctor doctor) {
        DoctorResponse response = new DoctorResponse();
        response.setName(doctor.getName());
        response.setPhone(doctor.getPhone());
        response.setBirthDate(doctor.getBirthDate());
        response.setGender(doctor.getGender());
        response.setCountryName(doctor.getCountryName());
        response.setCountryId(doctor.getCountryId());
        response.setCareerLevel(doctor.getCareerLevel().getCareerLevelName());
        response.setSpecialization(doctor.getSpecialization().getSpecializationName());
        return response;
    }
}