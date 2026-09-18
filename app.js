// =====================================================================
// STUDENT RECORDS DATA PROCESSOR — Version 4
// Pure vanilla JavaScript only. No HTML/CSS/Node APIs.
// Written with arrow functions throughout for a different style.
// =====================================================================

// ---------------------------------------------------------------------
// DATASET — 30+ hardcoded student records
// ---------------------------------------------------------------------
const students = [
  { id: 2001, name: "Miguel Angelo Santos",  year: 1, course: "Business Administration", grades: [80, 84, 78, 90], enrolled: true  },
  { id: 2002, name: "Charlene Dizon",        year: 2, course: "Business Administration", grades: [65, 60, 70],     enrolled: false },
  { id: 2003, name: "Rafael Concepcion",     year: 3, course: "Criminology",             grades: [92, 88, 95],     enrolled: true  },
  { id: 2004, name: "Bianca Marquez",        year: 4, course: "Criminology",             grades: [73, 75, 71],     enrolled: true  },
  { id: 2005, name: "Julius Cesar Ramos",    year: 1, course: "Hospitality Management",  grades: [58, 62, 60],     enrolled: true  },
  { id: 2006, name: "Angelica Ferrer",       year: 2, course: "Hospitality Management",  grades: [95, 97, 93, 99], enrolled: true  },
  { id: 2007, name: "Benedict Cordero",      year: 3, course: "Social Work",              grades: [81, 79, 83],     enrolled: false },
  { id: 2008, name: "Cristina Nepomuceno",   year: 4, course: "Social Work",              grades: [88, 90, 86],     enrolled: true  },
  { id: 2009, name: "Dexter Salvador",       year: 1, course: "Business Administration", grades: [67, 69, 65],     enrolled: true  },
  { id: 2010, name: "Erlinda Bonifacio",     year: 2, course: "Criminology",             grades: [76, 78, 74, 80], enrolled: true  },
  { id: 2011, name: "Francis Tuazon",        year: 3, course: "Hospitality Management",  grades: [55, 58, 52],     enrolled: false },
  { id: 2012, name: "Genevieve Ocampo",      year: 4, course: "Social Work",              grades: [91, 89, 93],     enrolled: true  },
  { id: 2013, name: "Herminio Lazaro",       year: 1, course: "Criminology",             grades: [63, 66, 61],     enrolled: true  },
  { id: 2014, name: "Imelda Ronquillo",      year: 2, course: "Business Administration", grades: [98, 96, 94],     enrolled: true  },
  { id: 2015, name: "Joven Mallari",         year: 3, course: "Social Work",              grades: [70, 72, 68],     enrolled: true  },
  { id: 2016, name: "Karen Joy Abrenica",    year: 4, course: "Hospitality Management",  grades: [85, 87, 83, 89], enrolled: false },
  { id: 2017, name: "Leandro Villamor",      year: 1, course: "Social Work",              grades: [59, 61, 57],     enrolled: true  },
  { id: 2018, name: "Maricel Buendia",       year: 2, course: "Hospitality Management",  grades: [93, 95, 91],     enrolled: true  },
  { id: 2019, name: "Norberto Aguilar",      year: 3, course: "Business Administration", grades: [77, 75, 79],     enrolled: true  },
  { id: 2020, name: "Odessa Trinidad",       year: 4, course: "Criminology",             grades: [86, 84, 88],     enrolled: true  },
  { id: 2021, name: "Perry Baltazar",        year: 1, course: "Hospitality Management",  grades: [],               enrolled: true  },
  { id: 2022, name: "Queenie Solis",         year: 2, course: "Social Work",              grades: [90, 92, 88],     enrolled: true  },
  { id: 2023, name: "Romulo Espino",         year: 3, course: "Criminology",             grades: [64, 67, 62],     enrolled: false },
  { id: 2024, name: "Susana Meneses",        year: 4, course: "Business Administration", grades: [96, 98, 94],     enrolled: true  },
  { id: 2025, name: "Teodoro Villalobos",    year: 1, course: "Business Administration", grades: [61, 63, 59],     enrolled: true  },
  { id: 2026, name: "Urduja Panlilio",       year: 2, course: "Hospitality Management",  grades: [82, 80, 84],     enrolled: true  },
  { id: 2027, name: "Vicente Manalastas",    year: 3, course: "Social Work",              grades: [99, 97, 95],     enrolled: true  },
  { id: 2028, name: "Wilhelmina Cruz",       year: 4, course: "Criminology",             grades: [60, 62, 58],     enrolled: false },
  { id: 2029, name: "Xerxes Padua",          year: 1, course: "Criminology",             grades: [87, 89, 85],     enrolled: true  },
  { id: 2030, name: "Yvonne Lacsamana",      year: 2, course: "Business Administration", grades: [79, 81, 77],     enrolled: true  },
  { id: 2031, name: "Zaldy Manaloto",        year: 3, course: "Hospitality Management",  grades: [94, 96, 92, 98], enrolled: true  },
];

// ---------------------------------------------------------------------
// REQUIRED FUNCTIONS — written as arrow functions with const bindings
// ---------------------------------------------------------------------

const getAverageGrade = (student) => {
  const grades = student && Array.isArray(student.grades) ? student.grades : [];
  if (grades.length === 0) return 0;
  return grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
};

const getTopStudents = (list, n) => {
  if (!Array.isArray(list)) throw new Error("getTopStudents: 'list' must be an array.");
  if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
    throw new Error("getTopStudents: 'n' must be a non-negative number.");
  }
  return list
    .map((student) => ({ ...student, averageGrade: getAverageGrade(student) }))
    .sort((a, b) => b.averageGrade - a.averageGrade)
    .slice(0, n);
};

const groupByCourse = (list) => {
  if (!Array.isArray(list)) throw new Error("groupByCourse: 'list' must be an array.");
  return list.reduce((groups, student) => {
    const key = student.course || "Unassigned";
    return { ...groups, [key]: groups[key] ? [...groups[key], student] : [student] };
  }, {});
};

const getEnrolledCount = (list) => {
  if (!Array.isArray(list)) throw new Error("getEnrolledCount: 'list' must be an array.");
  return {
    enrolled: list.filter((student) => student.enrolled === true).length,
    notEnrolled: list.filter((student) => student.enrolled === false).length,
  };
};

const findStudent = (list, name) => {
  if (!Array.isArray(list)) throw new Error("findStudent: 'list' must be an array.");
  if (typeof name !== "string" || name.trim() === "") return null;
  const query = name.trim().toLowerCase();
  const matches = list.filter((student) => (student.name || "").toLowerCase() === query);
  return matches.length ? matches[0] : null;
};

const getCourseAverages = (list) => {
  if (!Array.isArray(list)) throw new Error("getCourseAverages: 'list' must be an array.");
  const groups = groupByCourse(list);
  return Object.keys(groups)
    .map((course) => {
      const members = groups[course];
      const total = members.reduce((sum, student) => sum + getAverageGrade(student), 0);
      return { course, average: members.length ? total / members.length : 0 };
    })
    .sort((a, b) => b.average - a.average);
};

const exportSummary = (list) => {
  if (!Array.isArray(list)) throw new Error("exportSummary: 'list' must be an array.");
  if (list.length === 0) {
    return { totalStudents: 0, overallAverage: 0, topStudent: null, courseBreakdown: [] };
  }
  const totalStudents = list.length;
  const overallAverage = list.reduce((sum, s) => sum + getAverageGrade(s), 0) / totalStudents;
  const [topStudent = null] = getTopStudents(list, 1);
  const courseBreakdown = getCourseAverages(list);
  return { totalStudents, overallAverage, topStudent, courseBreakdown };
};

// ---------------------------------------------------------------------
// STRETCH GOALS
// ---------------------------------------------------------------------

const filterByYear = (list, year) => {
  if (!Array.isArray(list)) throw new Error("filterByYear: 'list' must be an array.");
  if (typeof year !== "number" || year <= 0) {
    throw new Error("filterByYear: 'year' must be a positive number.");
  }
  return list.filter((student) => student.year === year);
};

const sortByName = (list) => {
  if (!Array.isArray(list)) throw new Error("sortByName: 'list' must be an array.");
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
};

// ---------------------------------------------------------------------
// PRINT HELPERS
// ---------------------------------------------------------------------

const two = (num) => Number(num).toFixed(2);
const banner = (text) => {
  console.log("\n" + "*".repeat(52));
  console.log(text);
  console.log("*".repeat(52));
};

// ---------------------------------------------------------------------
// MAIN
// ---------------------------------------------------------------------

const main = () => {
  banner("STUDENT RECORDS ANALYSIS REPORT");
  console.log(`Total students: ${students.length}`);
  const overallAvg = students.reduce((sum, s) => sum + getAverageGrade(s), 0) / students.length;
  console.log(`Overall average grade: ${two(overallAvg)}`);

  banner("ENROLLMENT STATUS");
  const enrollment = getEnrolledCount(students);
  console.log(`Enrolled: ${enrollment.enrolled} | Not enrolled: ${enrollment.notEnrolled}`);

  banner("TOP 5 STUDENTS");
  getTopStudents(students, 5).forEach((s, i) =>
    console.log(`${i + 1}. ${s.name} (#${s.id}) — ${two(s.averageGrade)}, ${s.course} Yr ${s.year}`)
  );

  banner("COURSE AVERAGES (HIGH TO LOW)");
  getCourseAverages(students).forEach((c) => console.log(`${c.course}: ${two(c.average)}`));

  banner("STUDENT COUNT PER COURSE");
  const grouped = groupByCourse(students);
  Object.keys(grouped).forEach((course) => console.log(`${course}: ${grouped[course].length}`));

  banner("FIND STUDENT DEMO");
  const found = findStudent(students, "angelica ferrer");
  console.log(`"angelica ferrer" ->`, found ? `${found.name} (${found.course})` : "not found");
  const notFound = findStudent(students, "Nobody Here");
  console.log(`"Nobody Here" ->`, notFound === null ? "not found (null returned)" : notFound);

  banner("EDGE CASE: NO GRADES");
  const empty = findStudent(students, "Perry Baltazar");
  console.log(`${empty.name}: ${empty.grades.length} grades, average ${two(getAverageGrade(empty))}`);

  banner("EDGE CASE: EMPTY ARRAY");
  console.log("getTopStudents([], 3) ->", JSON.stringify(getTopStudents([], 3)));
  console.log("groupByCourse([]) ->", JSON.stringify(groupByCourse([])));
  console.log("getEnrolledCount([]) ->", JSON.stringify(getEnrolledCount([])));
  console.log("getCourseAverages([]) ->", JSON.stringify(getCourseAverages([])));
  console.log("exportSummary([]) ->", JSON.stringify(exportSummary([])));

  banner("EDGE CASE: INVALID INPUT");
  try {
    getTopStudents(students, -3);
  } catch (err) {
    console.log(`Caught: ${err.message}`);
  }

  banner("STRETCH: FILTER BY YEAR (Year 3)");
  filterByYear(students, 3).forEach((s) => console.log(` - ${s.name}`));

  banner("STRETCH: SORT BY NAME (first 5)");
  sortByName(students).slice(0, 5).forEach((s) => console.log(` - ${s.name}`));

  banner("EXPORT SUMMARY");
  const summary = exportSummary(students);
  console.log(`Students: ${summary.totalStudents}, Overall avg: ${two(summary.overallAverage)}`);
  console.log(`Top student: ${summary.topStudent.name} (${two(summary.topStudent.averageGrade)})`);
  summary.courseBreakdown.forEach((c) => console.log(`   ${c.course}: ${two(c.average)}`));

  banner("IMMUTABILITY CHECK");
  console.log(`students.length unchanged: ${students.length}`);
  console.log(`students[0] has no averageGrade key: ${!("averageGrade" in students[0])}`);

  banner("END OF REPORT");
};

main();