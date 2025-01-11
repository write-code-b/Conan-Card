const DB_NAME = "conan";

//Open DB
function openIndexedDB(store) {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DB_NAME);

    request.onerror = (e) => {
      reject("IndexedDB 접근 오류", e);
    };

    request.onsuccess = (e) => {
      const db = e.target.result;
      resolve(db);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore(store, {
        keyPath: "id",
      });
    };
  });
}

//Add data
export async function addDataToIndexedDB(store, data) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readwrite");
    const objectStore = transaction.objectStore(store);

    const request = objectStore.put(data);

    request.onsuccess = () => {
      resolve("data added!");
    };

    request.onerror = (e) => {
      console.log("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

//Get specific data
export async function getDataFromIndexedDB(store, key) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readonly");
    const objectStore = transaction.objectStore(store);

    const request = objectStore.get(key);

    request.onsuccess = (e) => {
      const data = e.target.result;
      resolve(data);
    };

    request.onerror = (e) => {
      reject("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

//Get all data
export async function getAllDataFromIndexedDB(store) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readonly");
    const objectStore = transaction.objectStore(store);

    const request = objectStore.getAll();

    request.onsuccess = (e) => {
      const data = e.target.result;
      resolve(data);
    };

    request.onerror = (e) => {
      reject("데이터 조회 중 오류가 발생했습니다.");
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}

//Delete data
export async function deleteDataToIndexedDB(store, key) {
  const db = await openIndexedDB();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, "readwrite");
    const objectStore = transaction.objectStore(store);

    const request = objectStore.delete(key);
    console.log(request);
    request.onsuccess = () => {
      resolve("delete ok!");
    };

    request.onerror = (e) => {
      reject("error", e);
    };

    transaction.oncomplete = () => {
      db.close();
    };
  });
}
