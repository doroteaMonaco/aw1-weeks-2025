# Exercise 7: React Q&A

_Goal: First steps with React applications. Create a "HeapOverrun" question page based on a tree of components (and props). Then, add the state._

## Creating a project

Create a new React project called **react-qa**, activate it and explore its files. Insert into `App.jsx` the code for loading a 'fake' set of questions and answers in JavaScript objects. For those objects, re-use the same data structures created for Exercises 3-4.

## Defining the component tree

Starting from the screen of the "HeapOverrun" question page (see Exercise 6), make a list of the components that you need to recreate the page.

For each component, list the information (`prop`s) that are required by that component (and/or by any other enclosed component).

## Implementing the components

Create a file `Components.jsx`, and define the React components as functions, and modify the App to render those components.

The components should **not** be interactive, yet. 

## Adding the state

Define where to put the state in the app and how many state variables you need, reflecting on the pros and cons. 

Use the 'fake' set of questions and answers to initialize the state. Update the existing components accordingly.