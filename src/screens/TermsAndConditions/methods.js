import React, {useState} from 'react';
import {useStores} from "@/hooks";
import {Screens} from '../../constants/Navigation';
import {useNavigation} from '@react-navigation/native';

const useViewModel = (props) => {
  const mockContent =
          '•    Terms & Conditions: \n\n' +
          `By using Docitoo application, platform, or any services provided by the platform, you (“user”, “developer”, “you”) are agreeing to be bound by the following terms and conditions ("Terms of Service”).` +
          '\n\n\n' +
          '•    Account Terms: \n\n' +
          '\t\t•\t\tAccount Terms: You must be 13 years or older to use the Services.\n' +
          '\t\t•\t\tYou must be a human. Accounts registered by "bots" or other automated methods are not permitted.\n' +
          '\t\t•\t\tYou must provide accurate information, which may include, but is not limited to, your legal full name, a valid email address, Blood type, and any other information requested in order to complete the signup process.\n' +
          '\t\t•\t\tYou are responsible for maintaining the security of your account and password. Docitoo cannot and will not be liable for any loss or damage from your failure to comply with this security obligation.\n' +
          '\n\n\n' +
          '•    Payment & Fees: \n\n' +
          '\t\t•\t\tYou do not have to pay any fees to register with Docitoo.\n' +
          '\t\t•\t\tIf you purchase a subscription to a feature or service, we will bill your payment method immediately, and then again at the beginning of each subscription period.' +
          ' If a free trial period is offered and you do not cancel during the free trial period, you will be billed at the end of the free trial period and at the beginning of each subsequent subscription period.' +
          ' You can cancel subscriptions at any time from your Account page. If you cancel a subscription you will still have access to the feature or service you subscribed to through the end of the subscription period.' +
          ' If an app or feature you subscribed to becomes unavailable during your subscription you will not be billed at the beginning of the next subscription period.\n' +
          '\n\n\n' +
          '•    Termination: \n\n' +
          '\t\t•\t\tDocitoo, in its sole discretion, has the right to suspend or terminate your account and refuse any and all current or future use of the Services for any reason at any time, including any act that is inconsistent with or in violation of our Usage Guidelines.' +
          ' Such termination of the Services will result in the deactivation or deletion of your Account or your access to your Account, and the forfeiture and relinquishment of all Content in your Account.' +
          ' Docitoo reserves the right to refuse service to anyone for any reason at any time.\n' +
          '\n\n\n' +
          '•    Responsibilities: \n\n' +
          '\t\t•\t\tWe are not responsible for drugs prescribed nor practitioners practices,we are only responsible for patience appointments with clinics.\n' +
          '\t\t•\t\tMedical reminders entered by the user nor the clinic are not subject to accountability by the Docitoo app, and any harm provided to the user has no relations to the portal provided by the application.\n' +
          '\n\n\n' +
          '•    Appointments Regulations & Error Mistakes: \n\n' +
          '\t\t•\t\tResponsibilities of the docitoo does not include the errors made by the clinics secretary which holds the responsibilities of accepting and declining dates agreed upon by both the user and the secretary of the clinic (admin).\n' +
          '\t\t•\t\tThe agreed date by both the clinics admin and the user cannot be sold nor given in exchange to any other user without the consent of the doctor and the owner of the date.\n' +
          '\n\n\n' +
          '•    Logo & Company Copyright: \n\n' +
          '\t\t•\t\tTrademarked logo, the logo nor the name doctor cannot be copied.\n' +
          '\n\n\n' +
          '•   Company Responsibilities: \n\n' +
          '\t\t•\t\tThe company Docitoo is responsible for setting up a functioning system to be operated and used by both the user and the clinics admin providing a method for communicating and setting up a date.\n' +
          '\t\t•\t\tThe company is not responsible for the damage provided to the equipments of a clinic by a patient, and will hold the clinic responsible for the damage.\n' +
          '\t\t•\t\tThe company is also responsible for the maintenance of the servers on which the application functions on, and the errors that are related to the system because of technical difficulties occurring within the system, the company will fix it, although it is not responsible for any physical damage provided to the monitors or tablets or any of the company provided equipment and the clinic responsible for the physical damage will be fined for the newly provided equipment.\n' +
          '\t\t•\t\tThe use of the app will require location to be provided in some cases in order to work more efficiently.\n' +
          '\n\n\n' +
          '•   Prohibited Use: \n\n' +
          '\t\t•\t\tUse of the application in order to book a date and then resell it through many user names even if verified.\n' +
          '\t\t•\t\tChanges of the date for more than 3 times without informing the clinic in order to plan a reschedule or even not attending the appointments without providing a logical excuse to the clinic.\n' +
          '\n\n\n' +
          '•   User Privacy, Doctor & Client Confidentiality: \n\n' +
          '\t\t•\t\tUser data will remain private and non disclosed by the app for any purpose.\n' +
          '\t\t•\t\tThe application is not responsible with the nondisclosure agreement made between the patient and the clinic.\n' +
          '\n\n\n' +
          "The terms and conditions are subject to change, updates and changes will notify users along with the date of the change."
  ;

  const {user} = useStores();
  const [content, setContent] = useState(mockContent);

  const nav = useNavigation(props);

  const onPressBack = () => {
    if (nav.canGoBack()) {
      nav.goBack();
    } else {
      nav.navigate(Screens.home);
    }
  };

  return {
    content,
    user,
    onPressBack,
  }
};

export default useViewModel;
