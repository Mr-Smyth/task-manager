import JSONAPIAdapter from '@ember-data/adapter/json-api';

export default class ApplicationAdapter extends JSONAPIAdapter {
    // i believe that once i have created a relationship between my 2 models i must now create a custom adaptor
    // Tell the adaptor to get the data from the public/api folder i have locally

    // source of information : https://guides.emberjs.com/release/models/customizing-adapters/#:~:text=If%20your%20backend%20has%20some%20consistent%20rules%20you%20can%20define%20an%20adapter%3Aapplication.%20The%20adapter%3Aapplication%20will%20get%20priority%20over%20the%20default%20Adapter%2C%20however%20it%20will%20still%20be%20superseded%20by%20model%20specific%20Adapters.
    // and https://api.emberjs.com/ember-data/release/classes/jsonapiadapter/#:~:text=Endpoint%20path%20customization,people/1.
    namespace = 'api';
}
