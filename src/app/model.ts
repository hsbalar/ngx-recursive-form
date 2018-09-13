export const model = [
  {
    order: 1,
    type: "string",
    defaultValue: "scsc",
    label: "Test",
    name: "test"
  },
  {
    description: "General",
    label: "General",
    name: "general",
    type: "object",
    parameters: [
      {
        order: 1,
        type: "string",
        label: "Working Directory",
        name: "workingDir"
      },
      {
        order: 1,
        type: "dateRange",
        format: "yyyy/mm/dd",
        label: "Working Directory",
        name: "xxx"
      },
      {
        order: 2,
        type: "select",
        defaultValue: "BINARY",
        label: "Transfer Mode",
        name: "transferMode",
        allowClear: false,
        showSearch: false,
        mode: "default",
        options: [
          {
            label: "BINARY",
            value: "BINARY"
          },
          {
            label: "ASCII",
            value: "ASCII"
          }
        ]
      },
      {
        name: "connection",
        label: "Connection",
        type: "object",
        order: 3,
        parameters: [
          {
            order: 1,
            type: "string",
            label: "Host",
            name: "host"
          },
          {
            order: 2,
            type: "number",
            defaultValue: "21",
            description: "The port number of the FTP server to connect",
            label: "Port",
            name: "port"
          },
          {
            order: 2,
            type: "password",
            description: "Password for the FTP Server.",
            label: "Password",
            name: "password"
          },
          {
            order: 3,
            name: "language",
            label: "Languages",
            type: "array",
            parameters: [
              {
                name: "languageName",
                label: "Language",
                type: "string",
                placeholder: "Language Name"
              },
              {
                name: "experience",
                label: "Experience",
                type: "number",
                placeholder: "experience in year"
              }
            ],
            defaultValue: []
          }
        ]
      }
    ]
  },
  {
    name: "advanced",
    type: "object",
    label: "Advanced",
    parameters: [
      {
        type: "async-select",
        description: "Lazy load",
        apiUrl: "https://api.randomuser.me",
        label: "Load users",
        name: "loadUser",
        mode: "multiple",
        placeholder: "tdt",
        options: [
          {
            label: "NANOSECONDS",
            value: "NANOSECONDS"
          }
        ]
      }
    ]
  }
];
