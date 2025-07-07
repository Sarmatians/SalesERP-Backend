nest g module hrm
nest g controller hrm
nest g service hrm

nest g class hrm/entities/department.entity --no-spec
nest g class hrm/entities/designation.entity --no-spec
nest g class hrm/entities/employee.entity --no-spec

nest g class hrm/dto/create-department.dto --no-spec
nest g class hrm/dto/update-department.dto --no-spec
nest g class hrm/dto/create-designation.dto --no-spec
nest g class hrm/dto/update-designation.dto --no-spec
nest g class hrm/dto/create-employee.dto --no-spec
nest g class hrm/dto/update-employee.dto --no-spec
