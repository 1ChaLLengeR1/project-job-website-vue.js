import router from "../../router/index";
export function LoadPage(page: string = "calculatorvat") {
  if (localStorage.getItem("page") === null) {
    router.push({ name: page });
  } else {
    router.push({ name: localStorage.getItem("page") as string });
  }
}
