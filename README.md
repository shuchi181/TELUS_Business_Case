# TELUS Business Case (Maiku Nakajima)
> Project made with MERN Stack (MongoDB, Express JS, React JS, Node JS). 

## Thought Process
1. Use an external react component [react-jsonschema-form](https://react-jsonschema-form.readthedocs.io/en/latest/), which allows me to build a HTML form from a json schema. This would make it much easier for me to create dynamic forms, since we could inject json into the schema when the user adds/deletes an input, and with react/redux, we could rerender the form when its been edited. We could then save the json into the database so that we can retrieve the form at anytime.

**The problem**: Learning how to use this third party component will take more time than I have.

2. Making a semi dynamic form builder with just React that will allow us to create/edit forms and publish them.

## Bugs to fix and Improvements to be made
**Bugs:**
1. ~~Components not rerendering after redux state is changed.~~ (FIXED)
2. ~~Previously visited form data is showing up in the current form.~~ (FIXED)

**Understanding the bug for 1. & 2.** : When user views a form and then a different form, the data from the previous form is populated in the current form. Which is definitely not good. I believe the reason why this is happening is due to the fact that redux does a shallow comparison between the previous state and the new state, to see if component should rerender or not. So It sees the form data as unchanged and therefore does not rerender the component which means the new form data is not populated until browser is manually refreshed.

3. Add PrivateRoutes to prevent users from editing the urls and accessing them which will result in an error. For example, taking the form ID from the edit-form link and pasting it into a link which shows form responses. Since a form thats editable has not been published yet, it obviously has no responses.

**Improvements:**
1. Add authentication so dashboard is not public.
2. Restructure database for more efficient data retrieval and upload.
3. **Make Form Fully Dynamic**
4. Make UI look more pleasant
5. Option to download response as CSV or .xml





