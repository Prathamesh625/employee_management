import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../libs/api";
import { Edit, Plus, Trash2 } from "lucide-react";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

type Employee = {
  id?: number;
  name: string;
  email: string;
  position: string;
};

const EmployeePage = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Employee>();

  const [editingId, setEditingId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: async () => (await getEmployees()).data,
  });

  const createMutation = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee added successfully");
    },
    onError: (error) => toast.error((error as Error).message),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Employee }) =>
      updateEmployee(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee Updated successfully");
      closeModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      toast.success("Employee Deleted successfully");
    },
  });

  const openModal = (employee?: Employee) => {
    if (employee) {
      setEditingId(employee.id!);
      setValue("name", employee.name);
      setValue("email", employee.email);
      setValue("position", employee.position);
    } else {
      setEditingId(null);
      reset();
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setEditingId(null);
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = (formData: Employee) => {
    editingId
      ? updateMutation.mutate({ id: editingId, data: formData })
      : createMutation.mutate(formData);
    closeModal();
  };

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return employees.filter(
      (emp: Employee) =>
        emp.name.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.position.toLowerCase().includes(term)
    );
  }, [employees, searchTerm]);

  return (
    <div className="grid grid-cols-3 max-md:grid-cols-1 gap-6 py-10 max-md:px-4 max-md:gap-0">
      {/* Left Section: Add Member */}
      <div className="col-span-1 w-full border border-neutral-300 rounded-md p-6 flex flex-col items-center justify-center text-center max-h-72">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add more</h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Right Section: Employee Table */}
      <div className="col-span-2 bg-white border border-neutral-300 rounded-md p-8 shadow-sm overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700 max-md:hidden">
            Employee List
          </h2>
          <input
            type="text"
            placeholder="Search by name, email, or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-neutral-300 max-md:w-full rounded-md px-3 py-2 w-64 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Position</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp: Employee) => (
                <tr key={emp.id} className="hover:bg-gray-50 transition">
                  <td className="border p-3">{emp.name}</td>
                  <td className="border p-3">{emp.email}</td>
                  <td className="border p-3">{emp.position}</td>
                  <td className="border p-5 flex justify-center gap-3">
                    <button
                      onClick={() => openModal(emp)}
                      className="text-neutral-700 hover:text-yellow-600 transition"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(emp.id!)}
                      className="text-neutral-700 hover:text-red-600 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center text-gray-500 p-6 italic"
                >
                  No employees found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}>
        <h1 className="text-2xl font-md mb-10">
          {editingId ? "Update Employee" : "Add Employee"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input
              {...register("name", { required: "Full name is required" })}
              placeholder="Full Name"
              className={`border rounded-md px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-left text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
              placeholder="Email Address"
              className={`border rounded-md px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-left text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("position", { required: "Position is required" })}
              placeholder="Position"
              className={`border rounded-md px-3 py-2 w-full shadow-sm focus:outline-none focus:ring-2 ${
                errors.position
                  ? "border-red-500 focus:ring-red-300"
                  : "focus:ring-blue-400"
              }`}
            />
            {errors.position && (
              <p className="text-red-500 text-left text-sm mt-1">
                {errors.position.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={closeModal}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-black hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium shadow transition"
            >
              {editingId ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployeePage;
