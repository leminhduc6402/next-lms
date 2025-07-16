import React from "react";

type Props = {
  params: {
    courseId: string;
  };
};

const DetailCoursePage = async ({ params }: Props) => {
  const { courseId } = await params;

  return <div>Course ID: {courseId}</div>;
};

export default DetailCoursePage;
