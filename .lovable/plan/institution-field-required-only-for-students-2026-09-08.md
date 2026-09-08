# Institution field: required only for students

## What changes
On the conference registration form, the "Institution" field becomes optional for every registration category except **Student**. Students must still enter their institution.

- The red "required" marker next to Institution appears only when Student is selected.
- The label reads "Institution (School)" for students and "Institution" otherwise.
- Everyone else can leave it blank and submit without an error.
- Nothing else about the form, pricing, or payment changes.

## Technical detail
In `src/pages/Registration.tsx`:
- Make `institution` optional in the zod schema (`z.string().trim().max(160).optional().or(z.literal(""))`) and add a `superRefine` that adds an issue on `institution` when `category === "student"` and the value is shorter than 2 characters.
- Watch `category` and pass `required={watchedCategory === "student"}` to the Institution `<Field>`.
- Submission already falls back to `values.organization || values.institution`; keep that but ensure empty strings are sent as empty, not undefined.
