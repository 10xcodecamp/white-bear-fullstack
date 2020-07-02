const insertUser = `
INSERT INTO users (
   id,
   email,
   \`password\`,
   created_at
)
   VALUES (?, ?, ?, ?);
`;
