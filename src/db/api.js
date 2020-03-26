import departmentsDB from "./departments";
import TreeView from "./treeView.json";
import BHP from "./workers/BHP.json";
import DK from "./workers/DK.json";
import H1 from "./workers/H1.json";
import H2 from "./workers/H2.json";
import HR from "./workers/HR.json";
import KK from "./workers/KK.json";
import M1 from "./workers/M1.json";
import M2 from "./workers/M2.json";
import M3 from "./workers/M3.json";
import PP from "./workers/PP.json";
import LOG from "./workers/LOG.json";

const workers = [
    {
        id: 5,
        name: "BHP",
        workers: BHP,
        length: BHP.length
    },
    {
        id: 2,
        name: "DK",
        workers: DK,
        length: DK.length
    },
    {
        id: 7,
        name: "H1",
        workers: H1,
        length: H1.length
    },
    {
        id: 8,
        name: "H2",
        workers: H2,
        length: H2.length
    },
    {
        id: 1,
        name: "HR",
        workers: HR,
        length: HR.length
    },
    {
        id: 4,
        name: "KK",
        workers: KK,
        length: KK.length
    },
    {
        id: 9,
        name: "M1",
        workers: M1,
        length: M1.length
    },
    {
        id: 10,
        name: "M2",
        workers: M2,
        length: M2.length
    },
    {
        id: 11,
        name: "M3",
        workers: M3,
        length: M3.length
    },
    {
        id: 6,
        name: "PP",
        workers: PP,
        length: PP.length
    },
    {
        id: 3,
        name: "LOG",
        workers: LOG,
        length: LOG.length
    }
];

export async function getUsersFromDepartment(departmentID, userNum = null) {
    return new Promise((resolve, reject) => {
        const id = workers.findIndex(w => w.id === departmentID);
        if (id === -1) {
            reject(new Error("No department with specified id"));
        }

        const departmentWorkers = workers[id].workers;

        if (userNum) {
            const { from, to } = userNum;
            resolve(departmentWorkers.slice(from, to));
        }

        resolve(departmentWorkers);
    });
}

export async function getUsersLength(departmentID) {
    return new Promise((resolve, reject) => {
        const id = workers.findIndex(w => w.id === departmentID);
        if (id === -1) {
            reject(new Error("No department with specified id"));
        }
        resolve(workers[id].length);
    });
}

async function getDepartments() {
    const departments = departmentsDB.departments;
    return new Promise((resolve, reject) => {
        resolve(departments);
    });
}

export async function getListedView() {
    const treeView = TreeView.tree;
    return new Promise((resolve, reject) => {
        resolve(treeView);
    });
}

/* export async function getListedView() {
    const departments = await getDepartments();
    const firstLevelRoots = departments.filter(dp => dp.root === null);
    firstLevelRoots.forEach( rt => {
        rt.children = departments.filter( dp => dp.root === rt.id )
    })
    console.log(firstLevelRoots)

    return await departments;
}
 */
