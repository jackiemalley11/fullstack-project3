import { getTechnologies } from '@/tools/DataManager';
import { Courses, Technology } from '@/tools/data.model';
import { List } from "./List";

export default async function Home() {

  const data = await getTechnologies(); 
  const technologies : Technology[] = data.technologies;
  const courses : Courses[] = data.courses;

  return (
    <div className="font-bold text-sm p-4">
      {technologies.length > 0 ?
				<List technologies={technologies} courses={courses}/>
			:
				<>There are currently no technologies in the database :(</>
			}
    </div>
  );
  
}