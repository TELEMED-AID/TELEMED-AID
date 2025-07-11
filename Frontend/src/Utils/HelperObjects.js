export const countries = [
    { code: "US", name: "United States", phoneCode: "+1" },
    { code: "CA", name: "Canada", phoneCode: "+1" },
    { code: "GB", name: "United Kingdom", phoneCode: "+44" },
    { code: "AU", name: "Australia", phoneCode: "+61" },
    { code: "DE", name: "Germany", phoneCode: "+49" },
    { code: "FR", name: "France", phoneCode: "+33" },
    { code: "JP", name: "Japan", phoneCode: "+81" },
    { code: "IN", name: "India", phoneCode: "+91" },
    { code: "BR", name: "Brazil", phoneCode: "+55" },
    { code: "ZA", name: "South Africa", phoneCode: "+27" },
    { code: "CN", name: "China", phoneCode: "+86" },
    { code: "RU", name: "Russia", phoneCode: "+7" },
    { code: "MX", name: "Mexico", phoneCode: "+52" },
    { code: "IT", name: "Italy", phoneCode: "+39" },
    { code: "ES", name: "Spain", phoneCode: "+34" },
    { code: "KR", name: "South Korea", phoneCode: "+82" },
    { code: "NG", name: "Nigeria", phoneCode: "+234" },
    { code: "AR", name: "Argentina", phoneCode: "+54" },
    { code: "EG", name: "Egypt", phoneCode: "+20" },
    { code: "TR", name: "Turkey", phoneCode: "+90" },
    { code: "ID", name: "Indonesia", phoneCode: "+62" },
    { code: "SA", name: "Saudi Arabia", phoneCode: "+966" },
    { code: "SE", name: "Sweden", phoneCode: "+46" },
    { code: "CH", name: "Switzerland", phoneCode: "+41" },
    { code: "NL", name: "Netherlands", phoneCode: "+31" },
    { code: "BE", name: "Belgium", phoneCode: "+32" },
    { code: "NO", name: "Norway", phoneCode: "+47" },
    { code: "PL", name: "Poland", phoneCode: "+48" },
    { code: "TH", name: "Thailand", phoneCode: "+66" },
    { code: "PH", name: "Philippines", phoneCode: "+63" },
    { code: "PK", name: "Pakistan", phoneCode: "+92" },
    { code: "BD", name: "Bangladesh", phoneCode: "+880" },
    { code: "VN", name: "Vietnam", phoneCode: "+84" },
    { code: "IR", name: "Iran", phoneCode: "+98" },
    { code: "IQ", name: "Iraq", phoneCode: "+964" },
    { code: "KE", name: "Kenya", phoneCode: "+254" },
    { code: "ET", name: "Ethiopia", phoneCode: "+251" },
    { code: "CO", name: "Colombia", phoneCode: "+57" },
    { code: "CL", name: "Chile", phoneCode: "+56" },
    { code: "UA", name: "Ukraine", phoneCode: "+380" },
    { code: "MY", name: "Malaysia", phoneCode: "+60" },
    { code: "SG", name: "Singapore", phoneCode: "+65" },
    { code: "NZ", name: "New Zealand", phoneCode: "+64" },
    { code: "GR", name: "Greece", phoneCode: "+30" },
    { code: "PT", name: "Portugal", phoneCode: "+351" },
    { code: "CZ", name: "Czech Republic", phoneCode: "+420" },
    { code: "AT", name: "Austria", phoneCode: "+43" },
    { code: "DK", name: "Denmark", phoneCode: "+45" },
    { code: "FI", name: "Finland", phoneCode: "+358" },
    { code: "HU", name: "Hungary", phoneCode: "+36" },
    { code: "RO", name: "Romania", phoneCode: "+40" },
    { code: "SK", name: "Slovakia", phoneCode: "+421" },
    { code: "IL", name: "Israel", phoneCode: "+972" },
    { code: "AE", name: "United Arab Emirates", phoneCode: "+971" },
    { code: "QA", name: "Qatar", phoneCode: "+974" },
    { code: "KW", name: "Kuwait", phoneCode: "+965" },
    { code: "MA", name: "Morocco", phoneCode: "+212" },
    { code: "DZ", name: "Algeria", phoneCode: "+213" },
    { code: "TN", name: "Tunisia", phoneCode: "+216" },
    { code: "GH", name: "Ghana", phoneCode: "+233" },
    { code: "SN", name: "Senegal", phoneCode: "+221" },
];

export const sampleAppointments = [
    {
        userId: "PATIENT123",
        doctorDetails: {
            name: "Dr. Sarah Johnson",
            phone: "+11234567890",
            birthDate: "1980-05-15",
            gender: "FEMALE",
            countryName: "United States",
            countryId: "US",
            careerLevel: "Consultant",
            specialization: "Orthopedics",
        },
        date: "2025-06-15",
        time: "09:30:00",
        state: "PENDING",
    },
    {
        userId: "PATIENT123",
        doctorDetails: {
            name: "Dr. Michael Chen",
            phone: "+19876543210",
            birthDate: "1975-11-22",
            gender: "MALE",
            countryName: "Canada",
            countryId: "CA",
            careerLevel: "Senior Consultant",
            specialization: "Cardiology",
        },
        date: "2025-06-10",
        time: "14:15:00",
        state: "CONFIRMED",
    },
    {
        userId: "PATIENT123",
        doctorDetails: {
            name: "Dr. Emily Wilson",
            phone: "+81312345678",
            birthDate: "1985-09-12",
            gender: "FEMALE",
            countryName: "Japan",
            countryId: "JP",
            careerLevel: "Resident",
            specialization: "Dermatology",
        },
        date: "2025-06-05",
        time: "11:00:00",
        state: "COMPLETED",
    },
    {
        userId: "PATIENT123",
        doctorDetails: {
            name: "Dr. Ahmed Hassan",
            phone: "+201234567890",
            birthDate: "1982-07-30",
            gender: "MALE",
            countryName: "Egypt",
            countryId: "EG",
            careerLevel: "Intern",
            specialization: "Neurology",
        },
        date: "2025-05-28",
        time: "16:45:00",
        state: "CANCELLED",
    },
    {
        userId: "PATIENT123",
        doctorDetails: {
            name: "Dr. Maria Rodriguez",
            phone: "+34911234567",
            birthDate: "1978-03-18",
            gender: "FEMALE",
            countryName: "Spain",
            countryId: "ES",
            careerLevel: "Senior Resident",
            specialization: "Pediatrics",
        },
        date: "2025-06-20",
        time: "10:00:00",
        state: "PENDING",
    },
    {
        userId: "PATIENT123",
        doctorDetails: {
            name: "Dr. James Wilson",
            phone: "+447700123456",
            birthDate: "1970-12-05",
            gender: "MALE",
            countryName: "United Kingdom",
            countryId: "GB",
            careerLevel: "Professor",
            specialization: "Oncology",
        },
        date: "2025-06-12",
        time: "13:30:00",
        state: "CONFIRMED",
    },
];

export const generateMockPatient = () => {
    const genders = ["Male", "Female", "Other"];
    const countries = [
        { name: "United States", id: "US" },
        { name: "Canada", id: "CA" },
        { name: "United Kingdom", id: "UK" },
        { name: "Australia", id: "AU" },
    ];

    const randomDate = (start, end) => {
        return new Date(
            start.getTime() + Math.random() * (end.getTime() - start.getTime())
        );
    };

    const country = countries[Math.floor(Math.random() * countries.length)];

    return {
        userId: Math.floor(Math.random() * 10000),
        name: `Patient ${Math.floor(Math.random() * 1000)}`,
        countryName: country.name,
        countryId: country.id,
        gender: genders[Math.floor(Math.random() * genders.length)],
        phone: `+1${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        birthDate: randomDate(
            new Date(1950, 0, 1),
            new Date(2005, 0, 1)
        ).toISOString(),
    };
};
