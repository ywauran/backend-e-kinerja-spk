// Data kriteria
const criteriaData = [
  {
    id: 1,
    uuid: "b7d1d1b8-6f36-47f8-bccc-919baeed7097",
    name: "Efektivitas",
    weight: 0,
    type: "BENEFIT",
  },
  {
    id: 2,
    uuid: "e4bc3a77-8faf-48d6-921a-81d147eadb34",
    name: "Efisiensi",
    weight: 0,
    type: "BENEFIT",
  },
  {
    id: 3,
    uuid: "26d880ce-5db1-4379-8160-f7babf7abdf6",
    name: "Inovasi",
    weight: 0,
    type: "BENEFIT",
  },
  {
    id: 4,
    uuid: "15122506-7be2-4ac5-9637-2bc53b8311b2",
    name: "Kerja Sama",
    weight: 0,
    type: "BENEFIT",
  },
  {
    id: 5,
    uuid: "16c555fd-8e63-4406-bf1f-733dc33a32b0",
    name: "Kecepatan",
    weight: 0,
    type: "BENEFIT",
  },
  {
    id: 6,
    uuid: "de278a0c-2634-4164-af60-8bc329d6c919",
    name: "Tanggung Jawab",
    weight: 0,
    type: "BENEFIT",
  },
  {
    id: 7,
    uuid: "ce500e53-01e5-4224-a2c5-1348ed6ac854",
    name: "Ketaatan",
    weight: 0,
    type: "BENEFIT",
  },
];

// Matriks perbandingan berpasangan (sesuaikan nilai sesuai preferensi Anda)
const pairwiseComparisonMatrix = [
  [1, 3, 2, 4, 3, 2, 3],
  [1 / 3, 1, 1, 2, 2, 1, 2],
  [1 / 2, 1, 1, 3, 2, 2, 3],
  [1 / 4, 1 / 2, 1 / 3, 1, 1 / 2, 1 / 3, 1 / 2],
  [1 / 3, 1 / 2, 1 / 2, 2, 1, 1, 2],
  [1 / 2, 1, 1 / 2, 3, 1, 1, 3],
  [1 / 3, 1 / 2, 1 / 3, 2, 1 / 2, 1 / 3, 1],
];

// Hitung nilai eigen dan vektor eigen
function calculateEigen(matrix) {
  const n = matrix.length;
  const eigenValues = [];
  const eigenVector = Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = 0; j < n; j++) {
      sum += matrix[i][j];
    }
    eigenValues.push(sum / n);
  }

  const sumEigenValues = eigenValues.reduce((acc, val) => acc + val, 0);

  for (let i = 0; i < n; i++) {
    eigenVector[i] = eigenValues[i] / sumEigenValues;
  }

  return eigenVector;
}

// Normalisasi vektor eigen untuk mendapatkan bobot preferensi
function normalizeVector(eigenVector) {
  const sum = eigenVector.reduce((acc, val) => acc + val, 0);
  return eigenVector.map((val) => val / sum);
}

// Hitung bobot preferensi
const eigenVector = calculateEigen(pairwiseComparisonMatrix);
const preferenceWeights = normalizeVector(eigenVector);

// Terapkan bobot preferensi pada data kriteria
criteriaData.forEach((criteria, index) => {
  criteria.weight = preferenceWeights[index];
});

// Tampilkan hasil bobot preferensi
console.log("Bobot Preferensi:");
criteriaData.forEach((criteria) => {
  console.log(`${criteria.name}: ${criteria.weight}`);
});
