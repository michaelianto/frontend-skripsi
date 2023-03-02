<template>
	<NavbarComponent />
	<div class="container-fluid pt-3">
		<div class="row">
			<div class="col-6">
				<h3 class="ml-4 text-left">All Courses</h3>
			</div>
			<div class="col-6 text-right">
				<router-link to="add-course" class="btn btn-primary mr-4"><i class="fa-solid fa-plus"></i> Add Courses</router-link>
			</div>
		</div>
		<table class="table m-3">
			<thead>
				<tr>
					<th scope="col">ID</th>
					<th scope="col">Course Name</th>
					<th scope="col">Course Price</th>
					<th scope="col"></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="course in courses" :key="course.id">
					<td>{{ course.id }}</td>
					<td>{{ course.courseName }}</td>
					<td>{{ course.coursePrice }}</td>
					<td>
						<button class="btn btn-primary text-white" data-toggle="modal" :data-target="'#courseModal' + course.id">
							<i class="fa-solid fa-eye"></i>
						</button>
					</td>

					<div class="modal fade" :id="'courseModal' + course.id" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
						<div class="modal-dialog" role="document">
							<div class="modal-content">
								<div class="modal-header">
									<h5 class="modal-title font-weight-bold" id="exampleModalLabel">{{ course.courseName }}</h5>
									<button type="button" class="close" data-dismiss="modal" aria-label="Close">
										<span aria-hidden="true">&times;</span>
									</button>
								</div>
								<div class="modal-body text-left">
									<p>{{ course.courseDescription }}</p>
									<p v-if="course.chapters && course.chapters.length != 0">Course's Chapters :</p>
									<ol>
										<li v-for="chapter in course.chapters" :key="chapter.id">
											<p class="chapter-name">{{ chapter.name }}</p>
											<p>{{ chapter.detail }}</p>
										</li>
									</ol>
									<b>${{ course.coursePrice }}</b>
								</div>
							</div>
						</div>
					</div>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import NavbarComponent from "@/components/Navbar.vue";
import gql from "graphql-tag";

const GET_COURSES_QUERY = gql`
	query getCourses {
		getCourses {
			id
			courseName
			courseDescription
			coursePrice
			createdBy
			chapters {
				id
				name
				detail
			}
		}
	}
`;

export default {
	components: {
		NavbarComponent,
	},
	apollo: {
		courses: {
			query: GET_COURSES_QUERY,
			update: (data) => data.getCourses,
			fetchPolicy: "no-cache",
		},
	},
	data() {
		return {
			courses: [],
		};
	},
};
</script>

<style>
.chapter-name {
	font-size: 20px;
}
</style>
