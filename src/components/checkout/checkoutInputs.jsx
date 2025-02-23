export const checkoutInputs = [
  {
    placeholder: "First Name",
    type: "text",
    id: "firstname",

    displayErrorMessage(errors) {
      {
        if (errors.firstname)
          return <p className="text-red-500">{errors.firstname.message}</p>;
      }
    },
  },
  {
    placeholder: "Last Name",
    type: "text",
    id: "lastname",

    displayErrorMessage(errors) {
      {
        if (errors.lastname)
          return <p className="text-red-500">{errors.lastname.message}</p>;
      }
    },
  },
  {
    placeholder: "Email",
    type: "email",
    id: "email",

    displayErrorMessage(errors) {
      {
        if (errors.email)
          return <p className="text-red-500">{errors.email.message}</p>;
      }
    },
  },
  {
    placeholder: "Phone No.",
    type: "tel",
    id: "phone",

    displayErrorMessage(errors) {
      {
        if (errors.phone)
          return <p className="text-red-500">{errors.phone.message}</p>;
      }
    },
  },
  {
    placeholder: "Community",
    type: "text",
    id: "community",

    displayErrorMessage(errors) {
      {
        if (errors.community)
          return <p className="text-red-500">{errors.community.message}</p>;
      }
    },
  },
  {
    placeholder: "City",
    type: "text",
    id: "city",
    displayErrorMessage(errors) {
      {
        if (errors.city)
          return <p className="text-red-500">{errors.city.message}</p>;
      }
    },
  },
  {
    placeholder: "County",
    type: "text",
    id: "county",
    displayErrorMessage(errors) {
      {
        if (errors.county)
          return <p className="text-red-500">{errors.county.message}</p>;
      }
    },
  },
];
