import calculateCaloriesAndMacrosNeeded from "./calories-needed";
import getMealPlan from "./mealplan-generator";

//setting up the enviornment
const macroResultsSection = document.querySelector('.macro_results');
macroResultsSection.style.display = 'none';

//"global variables
let macros;

//functions for displaying data
//loops the macros into the dom
function showUserMacroResults(listOfDataValues) {
    macroResultsSection.style.display = 'block';
    const dataSlots = document.getElementsByClassName('macro_results_data');
    const units = ['kcal', 'g', 'g', 'g'];
    
    let i = 0;
    while (i < dataSlots.length) {
        dataSlots[i].innerText = `${listOfDataValues[i]} ${units[i]}`;
        i++;
    };
};

//FOR TESTS - DELETE LATER FOR PROD

macroResultsSection.style.display = 'block';

macros = {
    caloriesNeeded: 3229, 
    carbohydrates: 403, 
    protein: 242,
    fat: 71,
    allergies: ['nuts', 'dairy']
};

showUserMacroResults([macros.caloriesNeeded, macros.protein, macros.carbohydrates, macros.fat]);

//handling the actions of form1
const form1 = document.querySelector('.form1');

form1.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //getting the forms values
    const userHeight = document.querySelector('#form1_height_input').value;
    const userWeight = document.querySelector('#form1_weight_input').value;
    const userAge = document.querySelector('#form1_age_input').value;
    const userGender = document.querySelector('input[name="form1_gender_radio"]:checked').value;
    const userActivityLevel = document.querySelector('input[name="form1_activity_level_radio"]:checked').value;
    const userWeightGoal = document.querySelector('input[name="form1_weight_goal_radio"]:checked').value;
    const userDietType = document.querySelector('input[name="form1_diet_type_radio"]:checked').value;
    const allergiesElements = document.querySelectorAll('input[name="form1_allergies"]:checked');
    const allergies = [];
    allergiesElements.forEach((allergyElement) => allergies.push(allergyElement.value));

    //putting together the diet
    const userMacros = calculateCaloriesAndMacrosNeeded(userWeight, userHeight, userAge, userGender, userActivityLevel, userWeightGoal);

    showUserMacroResults([userMacros.caloriesNeeded, userMacros.protein, userMacros.carbohydrates, userMacros.fat]);

    console.log(userMacros);
    userMacros.allergies = allergies;
    macros = userMacros;
});

//handling the get meal-plan request by user in form1
const form1GetMealPlanButton = document.querySelector('#macro_results_get_meal_plan_button');

form1GetMealPlanButton.addEventListener('click', () => {
    console.log('trying to generate some meal plan');
    getMealPlan(macros);
});