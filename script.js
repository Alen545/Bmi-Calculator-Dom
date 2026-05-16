// 1. Create the wrapper container
const container = document.createElement('div');
container.className = 'calculator-container';

// 2. Create and add Heading
const heading = document.createElement('h2');
heading.innerText = 'BMI Calculator';
container.appendChild(heading);

// 3. Helper function to quickly create input structures
function createInputGroup(labelText, inputId, placeholderText) {
    const group = document.createElement('div');
    group.className = 'input-group';

    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.innerText = labelText;

    const input = document.createElement('input');
    input.type = 'number';
    input.id = inputId;
    input.placeholder = placeholderText;
    input.required = true;

    group.appendChild(label);
    group.appendChild(input);
    return group;
}

// Add Weight & Height Input groups to container
const weightGroup = createInputGroup('Weight (kg)', 'weight', 'e.g. 70');
const heightGroup = createInputGroup('Height (cm)', 'height', 'e.g. 175');
container.appendChild(weightGroup);
container.appendChild(heightGroup);

// 4. Create and add Calculate Button
const calculateBtn = document.createElement('button');
calculateBtn.innerText = 'Calculate BMI';
container.appendChild(calculateBtn);

// 5. Create Results Box structure (Hidden initially)
const resultBox = document.createElement('div');
resultBox.className = 'result-box';

const bmiValueDisplay = document.createElement('div');
bmiValueDisplay.className = 'bmi-value';

const bmiStatusDisplay = document.createElement('div');
bmiStatusDisplay.className = 'bmi-status';

resultBox.appendChild(bmiValueDisplay);
resultBox.appendChild(bmiStatusDisplay);
container.appendChild(resultBox);

// Inject our fully built container into the blank HTML body
document.body.appendChild(container);

// 6. Calculation Logic Event Listener
calculateBtn.addEventListener('click', () => {
    const weight = parseFloat(document.getElementById('weight').value);
    const heightCm = parseFloat(document.getElementById('height').value);

    // Validate inputs
    if (!weight || !heightCm || weight <= 0 || heightCm <= 0) {
        alert('Please enter valid, positive numbers for weight and height.');
        return;
    }

    // Convert height from cm to meters and calculate BMI
    const heightM = heightCm / 100;
    const bmi = (weight / (heightM * heightM)).toFixed(1);

    // Determine BMI tier classification and styling class
    let status = '';
    let className = '';

    if (bmi < 18.5) {
        status = 'Underweight';
        className = 'underweight';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        status = 'Normal Weight';
        className = 'normal';
    } else {
        status = 'Overweight / Obese';
        className = 'overweight';
    }

    // Reset old result box classes, then apply new layout state
    resultBox.className = `result-box ${className}`;
    bmiValueDisplay.innerText = `Your BMI: ${bmi}`;
    bmiStatusDisplay.innerText = status;
    
    // Show the results box visually
    resultBox.style.display = 'block';
});