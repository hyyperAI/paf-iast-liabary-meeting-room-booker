# Task Analysis & JSON Creation
ask me as much question as you want to make sure you understand the task
### Simple Tasks (≤2 files modified)

Create `task_[name].json`:

- description
- goal
- final result
- code written (mention specific lines)
- status
- other main things to help complete the task

## Process flow for complex tasks:
Documentation Research
      ↓
Structured JSON Planning
      ↓
Backend-First Implementation
      ↓
UI Specification Review ← CRITICAL STEP - USER FEEDBACK LOOP
      ↓
Question-Driven Clarification ← ENSURE COMPLETE UNDERSTANDING
      ↓
Frontend Implementation
      ↓
End-to-End Testing

### Complex Tasks (multiple features/components, >2 files)

Create up to 4 JSON files:

1. `task_[name].json` - Main task definition
2. `backend_[name].json` - Backend Implementation (Backend-First Phase)
3. `frontend_[name].json` - Frontend Implementation (Frontend-First Phase) , UI/UX Specification & sample diagram
4. `progress_[name].json` - Implementation steps & status tracking
5. `structure_[name].json` - Architecture, file changes, data flow

If user explictly asked that don't use this formate but open json files as much as you want you can use, then make things accordingly
## Implementation Prompt Template

After creating JSON files, output this structured prompt:

```
# MAIN TASK
[Clear one-line description]

## PROJECT STRUCTURE
[Current relevant files that need to be working on]

## IMPLEMENTATION PLAN
[High-level approach (in steps mention ,json)]

## TASKS
Please follow the JSON files exactly to:
1. [Specific action from JSON]
2. [Specific action from JSON]
3. [Specific action from JSON]

## IMPORTANT REQUIREMENTS

⚠️ DO NOT MODIFY:
- [Files/sections to preserve (if needed)]
- [Existing functionality to maintain (if needed)]

✅ MUST PRESERVE:
- [State management patterns]
- [Naming conventions]
- [Code style]

✅ IMPLEMENT EXACTLY AS SHOWN:
- [Specific implementations from JSON]
- [Configuration details]

## REFERENCE WORK
Use the code snippets in the JSON files as your implementation guide.
Each file shows:
- Which file to modify
- What code to add/replace
- What the new implementation should be
OR
[What's the new thing you are going to added]

## DATA MAPPING

## SUCCESS CRITERIA
After implementation:
[What needs to work/be achieved]

```


## Key Principles

1. **Always create JSON tracking files first** before any code changes
2. **Use 1 JSON for simple tasks, up to 4 for complex tasks** (never more)
3. **If stuck in any thing** do use another approach (not more then 3 times)
4. **Follow JSON specifications exactly** during implementation
5. **Update JSON files** after completion with actual results
6. **You can change** main structure or other things only when you need it's very very necessary for a features, be dynamic
7. **Create [task]_prompt.txt** file automatically after creating json
8. **For complex_task folder:** use .claude\tasks\complex_tasks\ : for complex tasks
9. **For simple_task folder:** use .claude\tasks\simple_tasks\: for simple tasks
10. **Before implementing** if you have any question do ask me for clarification
11. **THIS IS PLAN STAGE NOT IMPLEMENT STAGE**
12. **Don't distruct** from your main goal and stick to it
13. **PLugins and agents** you have, utilize them in your task to make task more efficient and working



#### THIS IS NOT A FILE CREATION STEP. THIS SHOULD BE IN CHAT MODULE NOT IN ANY JSON OR PROMPT FILE

## Implementattion instructions:
- Create a plan at the end to tell agent steps of implementation
- proposed solution of problem in simple words
- a To do list for agent to do things (must be more than 5, can be more than 10 items). the todo list should be: Ordered, Sequential or Parrell (based on task dependency on each other), Unambiguous, Verifiable, Complete
- Formate of todo: Format: [Action Verb] + [Specific Target] + [Location/Context]
- Key details in prompt
- THIS IS ONLY PLANNING STAGE NOT AN IMPLEMENTATION STAGE


## USE THIS COMMMAND TO ANALYZE CODE TO GET INSIGHTS FOR ERROR OR CONFUSION:
-   use Explore(Deep codebase analysis for [taskname] & it's solution )
-   use it's outuput to make a plan with very smaller steps ( functionlity is avaliable,)


