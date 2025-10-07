import { Request, Response } from "express";
import employeeService from "@services/employee.service";
import prisma from "../client";

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const { name, email, position } = req.body;
        const checkIfEmailExists = await prisma.employee.findUnique({
            where: { email }
        });
        if (checkIfEmailExists) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const employee = await employeeService.createEmployee(name, email, position);
        res.status(201).json(employee);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
};

export const getAllEmployees = async (_: Request, res: Response) => {
    const employees = await employeeService.getAllEmployees();
    res.json(employees);
};

export const getEmployee = async (req: Request, res: Response) => {
    const employee = await employeeService.findEmployeeById(req.params.id);
    employee ? res.json(employee) : res.status(404).json({ error: "Not found" });
};

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const employee = await employeeService.updateEmployee(req.params.id, req.body);
        res.json(employee);
    } catch {
        res.status(404).json({ error: "Not found" });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        await employeeService.deleteEmployee(req.params.id);
        res.status(204).send();
    } catch {
        res.status(404).json({ error: "Not found" });
    }
};
