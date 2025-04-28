package com.doctorservice.DoctorService.service;

import com.doctorservice.DoctorService.dto.*;
import com.doctorservice.DoctorService.entity.*;
import com.doctorservice.DoctorService.exception.EntityNotFoundException;
import com.doctorservice.DoctorService.repository.CareerLevelRepository;
import com.doctorservice.DoctorService.repository.DoctorRepository;
import com.doctorservice.DoctorService.repository.SpecializationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.Time;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

    public void setDoctorAvailability(String nationalId, DoctorAvailabilityRequest request) throws Exception {
        Doctor doctor = doctorRepository.findById(nationalId)
                .orElseThrow(() -> new Exception("Doctor not found"));

        // Add new availability
        for (DayAvailabilityRequest dayRequest : request.getDays()) {
            System.out.println("Day: " + dayRequest.getDayOfWeek());
            DoctorAvailableDay availableDay = new DoctorAvailableDay();
            availableDay.setDayOfWeek(dayRequest.getDayOfWeek());
            availableDay.setDoctor(doctor);
            for (TimeSlotRequest slotRequest : dayRequest.getTimeSlots()) {
                System.out.println("Start time: " + slotRequest.getStartTime());
                System.out.println("Duration: " + slotRequest.getDuration());
                TimeSlot timeSlot = TimeSlot.builder()
                        .availableDay(availableDay)
                        .duration(slotRequest.getDuration())
                        .startTime(slotRequest.getStartTime())
                        .build();
                availableDay.getTimeSlots().add(timeSlot);
            }

            doctor.getAvailableDays().add(availableDay);
        }

        doctorRepository.save(doctor);
    }

    @Transactional(readOnly = true)
    public PageResponse<DoctorSearchResponse> searchDoctors(DoctorSearchRequest request, int page, int size) {
        // First query - get doctors without availability details
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Doctor> doctorPage = doctorRepository.findDoctorsByCriteria(
                request.getName(),
                request.getSpecialization(),
                request.getCareerLevel(),
                request.getAvailabilityDay(),
                request.getStartTime(),
                pageable);

        // Second query - get availability for the found doctors
        List<DoctorAvailableDay> availability = doctorRepository.findAvailabilityWithTimeSlots(doctorPage.getContent());

        // Group availability by doctor
        Map<Doctor, List<DoctorAvailableDay>> availabilityByDoctor = availability.stream()
                .collect(Collectors.groupingBy(DoctorAvailableDay::getDoctor));

        // Build response
        List<DoctorSearchResponse> content = doctorPage.getContent().stream()
                .map(doctor -> {
                    DoctorSearchResponse response = new DoctorSearchResponse();
                    response.setName(doctor.getName());
                    response.setPhone(doctor.getPhone());
                    response.setSpecialization(doctor.getSpecialization().getSpecializationName());
                    response.setCareerLevel(doctor.getCareerLevel().getCareerLevelName());

                    List<DoctorAvailableDay> doctorAvailability = availabilityByDoctor.getOrDefault(doctor, Collections.emptyList());
                    response.setAvailability(doctorAvailability.stream()
                            .map(this::convertToDayAvailabilityResponse)
                            .collect(Collectors.toList()));

                    return response;
                })
                .collect(Collectors.toList());

        return new PageResponse<>(new PageImpl<>(content, pageable, doctorPage.getTotalElements()));
    }

    // Helper method to convert Doctor entity to response DTO
    private DoctorSearchResponse convertToDoctorSearchResponse(Doctor doctor) {
        DoctorSearchResponse response = new DoctorSearchResponse();
        response.setName(doctor.getName());
        response.setPhone(doctor.getPhone());
        response.setSpecialization(doctor.getSpecialization().getSpecializationName());
        response.setCareerLevel(doctor.getCareerLevel().getCareerLevelName());

        // Convert availability days
        response.setAvailability(doctor.getAvailableDays().stream()
                .map(this::convertToDayAvailabilityResponse)
                .collect(Collectors.toList()));

        return response;
    }

    // Helper method to convert DoctorAvailableDay to response DTO
    private DayAvailabilityResponse convertToDayAvailabilityResponse(DoctorAvailableDay availableDay) {
        DayAvailabilityResponse dayResponse = new DayAvailabilityResponse();
        dayResponse.setDay(availableDay.getDayOfWeek());

        // Convert time slots
        dayResponse.setTimeSlots(availableDay.getTimeSlots().stream()
                .map(this::convertToTimeSlotResponse)
                .collect(Collectors.toList()));

        return dayResponse;
    }

    // Helper method to convert TimeSlot to response DTO
    private TimeSlotResponse convertToTimeSlotResponse(TimeSlot timeSlot) {
        TimeSlotResponse slotResponse = new TimeSlotResponse();
        slotResponse.setStartTime(timeSlot.getStartTime());
        slotResponse.setDuration(timeSlot.getDuration());
        return slotResponse;
    }

}