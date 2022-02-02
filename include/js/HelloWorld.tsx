import {createSignal, onCleanup} from 'solid-js'

export function HelloWorld() {
    const [msg, setMsg] = createSignal('Hello world!')

    // Change `msg` 5 seconds later.
    const timeout = setTimeout(() => {
        setMsg('Hello Universe!')
    }, 5000)

    // Clean up the timeout in case the component is unmounted before 5 seconds.
    onCleanup(() => {
        clearTimeout(timeout)
    })

    return (
        <div class="example">
            {msg}

            <style jsx>{
                /*css*/ `
                    .example {
                        color: red;
                    }
                `
            }</style>
        </div>
    )
}
