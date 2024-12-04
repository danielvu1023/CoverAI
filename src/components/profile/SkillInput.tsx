export default function SkillInput({
  skills,
  setSkills,
}: {
  skills: string[];
  setSkills: any;
}) {
  return (
    <div>
      <div>
        <h3 className="my-2">My Skills</h3>
        <div className="flex flex-wrap">
          {skills.map((skill, index) => (
            <span
              className="relative py-1 px-2 m-1 rounded bg-blue-500 text-white"
              key={index}
            >
              <div
                onClick={() => {
                  setSkills((prev: any) =>
                    prev.filter((_: any, i: number) => i !== index)
                  );
                }}
                className="absolute text-[8px] flex justify-center items-center bg-red-500 -right-1 -top-1 rounded-full w-3 h-3 cursor-pointer"
              >
                x
              </div>
              {skill}
            </span>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target as HTMLFormElement;
            const skillInput = form.elements.namedItem(
              "skill"
            ) as HTMLInputElement;
            if (skillInput.value === "") return;
            setSkills((prev: any) => [...prev, skillInput.value]);
          }}
        >
          <input className="mr-2" name="skill" placeholder="Add a skill" />
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
