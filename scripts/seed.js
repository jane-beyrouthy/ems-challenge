import sqlite3 from "sqlite3";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbConfigPath = path.join(__dirname, "../database.yaml");
const dbConfig = yaml.load(fs.readFileSync(dbConfigPath, "utf8"));

const { sqlite_path: sqlitePath } = dbConfig;

const db = new sqlite3.Database(sqlitePath);

const employees = [
  {
    full_name: "Lina Haddad",
    email: "lina.haddad@company.com",
    phone: "+961 71 223344",
    dob: "1990-04-15",
    job_title: "Marketing Manager",
    department: "Marketing",
    salary: 5500,
    start_date: "2024-02-01",
    end_date: null,
  },
  {
    full_name: "Omar Khalil",
    email: "omar.khalil@company.com",
    phone: "+961 76 556677",
    dob: "1985-08-22",
    job_title: "Software Engineer",
    department: "Engineering",
    salary: 7000,
    start_date: "2023-11-10",
    end_date: null,
  },
  {
    full_name: "Sara Mansour",
    email: "sara.mansour@company.com",
    phone: "+961 78 998877",
    dob: "1995-06-30",
    job_title: "HR Coordinator",
    department: "HR",
    salary: 4000,
    start_date: "2024-01-15",
    end_date: null,
  },
  {
    full_name: "Ahmad Darwish",
    email: "ahmad.darwish@company.com",
    phone: "+961 70 112233",
    dob: "1988-02-14",
    job_title: "Financial Analyst",
    department: "Finance",
    salary: 6500,
    start_date: "2023-09-05",
    end_date: null,
  },
  {
    full_name: "Maya Fares",
    email: "maya.fares@company.com",
    phone: "+961 71 445566",
    dob: "1992-12-05",
    job_title: "UX/UI Designer",
    department: "Engineering",
    salary: 6000,
    start_date: "2024-03-01",
    end_date: null,
  },
  {
    full_name: "Karim Solh",
    email: "karim.solh@company.com",
    phone: "+961 71 667788",
    dob: "1991-11-10",
    job_title: "Data Analyst",
    department: "IT",
    salary: 5500,
    start_date: "2023-08-15",
    end_date: null,
  },
  {
    full_name: "Nada Ghanem",
    email: "nada.ghanem@company.com",
    phone: "+961 76 889900",
    dob: "1994-05-23",
    job_title: "Sales Executive",
    department: "Sales",
    salary: 4800,
    start_date: "2024-02-20",
    end_date: null,
  },
  {
    full_name: "Youssef Karam",
    email: "youssef.karam@company.com",
    phone: "+961 78 554433",
    dob: "1987-02-07",
    job_title: "Operations Manager",
    department: "Operations",
    salary: 7500,
    start_date: "2023-10-10",
    end_date: null,
  },
  {
    full_name: "Layla Saadi",
    email: "layla.saadi@company.com",
    phone: "+961 79 112233",
    dob: "1996-08-14",
    job_title: "Software Developer",
    department: "Engineering",
    salary: 6800,
    start_date: "2024-01-10",
    end_date: null,
  },
  {
    full_name: "Rami Chami",
    email: "rami.chami@company.com",
    phone: "+961 70 334455",
    dob: "1993-06-19",
    job_title: "Customer Support Lead",
    department: "Customer Service",
    salary: 5200,
    start_date: "2023-12-01",
    end_date: null,
  },
];

const timesheets = [
  {
    employee_id: 1,
    start_time: "2025-02-10 08:00",
    end_time: "2025-02-10 16:00",
  },
  {
    employee_id: 2,
    start_time: "2025-02-11 09:30",
    end_time: "2025-02-11 17:30",
  },
  {
    employee_id: 3,
    start_time: "2025-02-12 07:45",
    end_time: "2025-02-12 15:45",
  },
  {
    employee_id: 4,
    start_time: "2025-02-13 10:00",
    end_time: "2025-02-13 18:00",
  },
  {
    employee_id: 5,
    start_time: "2025-02-14 06:30",
    end_time: "2025-02-14 14:30",
  },
  {
    employee_id: 6,
    start_time: "2025-02-17 08:30",
    end_time: "2025-02-17 16:30",
  },
  {
    employee_id: 7,
    start_time: "2025-02-18 09:00",
    end_time: "2025-02-18 17:00",
  },
  {
    employee_id: 8,
    start_time: "2025-02-19 07:15",
    end_time: "2025-02-19 15:15",
  },
  {
    employee_id: 9,
    start_time: "2025-02-20 10:45",
    end_time: "2025-02-20 18:45",
  },
  {
    employee_id: 10,
    start_time: "2025-02-21 06:00",
    end_time: "2025-02-21 14:00",
  },
];

const insertData = (table, data) => {
  const columns = Object.keys(data[0]).join(", ");
  const placeholders = Object.keys(data[0])
    .map(() => "?")
    .join(", ");

  const insertStmt = db.prepare(
    `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`
  );

  data.forEach((row) => {
    insertStmt.run(Object.values(row));
  });

  insertStmt.finalize();
};

db.serialize(() => {
  insertData("employees", employees);
  insertData("timesheets", timesheets);
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Database seeded successfully.");
  }
});
