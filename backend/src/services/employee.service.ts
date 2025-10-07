import prisma from "../client";
import { Employee } from "../../generated/prisma";

const createEmployee = async (name: string, email: string, position: string) => {

    return await prisma.employee.create({
        data: { name, email, position },
    });
};

const getAllEmployees = async () => {
    return await prisma.employee.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

const findEmployeeById = async (id: string) => {
    return await prisma.employee.findUnique({
        where: { id }
    })
}

const updateEmployee = async (id: string, employee: Employee) => {
    const { name, email, position } = employee
    return await prisma.employee.update({
        where: { id },
        data: { name, email, position },
    });
};

const deleteEmployee = async (id: string) => {
    return await prisma.employee.delete({
        where: { id },
    });
};


export default {
    createEmployee,
    updateEmployee,
    getAllEmployees,
    deleteEmployee,
    findEmployeeById
}
