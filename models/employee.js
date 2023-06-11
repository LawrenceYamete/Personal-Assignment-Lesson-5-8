module.exports = (mongoose) => {
    const employeeSchema = mongoose.Schema({
      username: {
        type: String
      },
      password: {
        type: String
      },
      firstName: {
        type: String
      },
      lastName: {
        type: String
      },
      email: {
        type: String
      },
      phoneNumber: {
        type: String
      },
      birthday: {
        type: String
      },
      address: {
        type: String
      },
      interest: {
        type: Boolean
      },
      occupation: {
        jobTitle: {
          type: [String]
        },
        responsibilities: {
          type: [mongoose.SchemaTypes.Mixed]
        },
        education: {
          type: [String]
        },
        expertise: {
            type: [Boolean]
          },
        skills: {
          type: [String]
        },
        salary: {
          type: [mongoose.SchemaTypes.Mixed]
        }
      },
      emergencyContact: {
        firstName: {
            type: String
          },
          lastName: {
            type: String
          },
          phoneNumber: {
            type: String
          },
          email: {
            type: String
          },
          address: {
            type: String
          }
        }});
  
    return mongoose.model('users', employeeSchema);
  };