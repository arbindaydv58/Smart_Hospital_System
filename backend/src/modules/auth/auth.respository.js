import prisma from "../../prisma/client.js";

class AuthRepository {
  findUserByEmail = (email) => {
    return prisma.user.findUnique({ where: { email } });
  };

  createUser = async (data) => {
    const { role, ...userData } = data;

    return prisma.user.create({
      data: {
        ...userData,
        role,
        ...(role === "PATIENT" && {
          patient: {
            create: {},
          },
        }),
        ...(role === "DOCTOR" && {
          doctor: {
            create: {
              specialization: data.specialization || "General",
              departmentId: data.departmentId || 1,
            },
          },
        }),
      },
      include: {
        patient: true,
        doctor: true,
      },
    });
  };

  createUserWithProfile = (data) => this.createUser(data);
}

const AuthRepo = new AuthRepository();
export default AuthRepo;
