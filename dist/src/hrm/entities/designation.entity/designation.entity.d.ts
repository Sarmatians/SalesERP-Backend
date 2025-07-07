import { Department } from '../department.entity/department.entity';
import { Employee } from '../employee.entity/employee.entity';
export declare class Designation {
    id: number;
    title: string;
    department: Department;
    employees: Employee[];
}
