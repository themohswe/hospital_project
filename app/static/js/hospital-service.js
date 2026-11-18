const hospitalService = {
    // Get every department
    async getDepartments() {
        return hospitalData.departments;
    },

    // Get one department by ID
    async getDepartmentById(id) {
        const department = hospitalData.departments.find(
            function (item) {
                return item.id === id;
            }
        );

        return department ?? null;
    },

    // Get doctors available for public display
    async getDoctors() {
        return hospitalData.doctors.filter(function (doctor) {
            return doctor.status !== "inactive";
        });
    },

    // Get doctors belonging to one department
    async getDoctorsByDepartment(departmentId) {
        const doctors = await this.getDoctors();

        return doctors.filter(function (doctor) {
            return doctor.departmentId === departmentId;
        });
    },

    // Get one doctor by ID
    async getDoctorById(id) {
        const doctors = await this.getDoctors();

        return doctors.find(function (doctor) {
            return doctor.id === id;
        }) ?? null;
    }
};